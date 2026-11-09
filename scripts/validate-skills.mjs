#!/usr/bin/env node
// Validates every skill under skills/ against the Agent Skills spec and this
// repo's conventions. No dependencies. Exit code 1 on any error.
//
//   node scripts/validate-skills.mjs            # validate all skills
//   node scripts/validate-skills.mjs niche-finder
//
// Checks:
//   - SKILL.md exists and has YAML frontmatter with name + description
//   - name: 1-64 chars, [a-z0-9-], no leading/trailing/double hyphen, == folder
//   - description: 1-1024 chars, mentions TubeLab (routing convention, warning)
//   - unquoted top-level values strict YAML would reject (": ", " #", leading indicator)
//   - metadata (if present) is a flat string map
//   - SKILL.md body < 500 lines
//   - relative links and backticked scripts/ paths resolve to real files
//   - no hard-coded ISO dates (use recency tokens: month|trimester|semester|year)
//   - description under 500 chars (warning): it is loaded for every skill in every chat
//   - no skill has PROMPT.md / assets/ / references/ (SKILL.md is self-contained; the API reference lives
//     at https://tubelab.net/docs/skill.md)
//   - workflow skills (everything except tubelab-mcp) have an "## Output Format" section with the
//     artifact layout inline
//   - workflow skills (warnings): at most 650 words of instruction (frontmatter and prose, fenced blocks not
//     counted), description under 40 words

import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SKILLS_DIR = join(ROOT, 'skills');
const DATA_SKILLS = new Set(['tubelab-mcp']);

const only = process.argv.slice(2);
const errors = [];
const warnings = [];

function parseFrontmatter(text, file) {
  if (!text.startsWith('---\n')) {
    errors.push(`${file}: missing frontmatter (file must start with ---)`);
    return null;
  }
  const end = text.indexOf('\n---', 4);
  if (end === -1) {
    errors.push(`${file}: unterminated frontmatter`);
    return null;
  }
  const block = text.slice(4, end);
  const fm = {};
  let currentMap = null;
  let currentKey = null;
  let buffer = [];
  const flush = () => {
    if (currentKey && buffer.length) {
      fm[currentKey] = buffer.join(' ').replace(/\s+/g, ' ').trim();
    }
    buffer = [];
  };
  for (const raw of block.split('\n')) {
    if (!raw.trim()) continue;
    const nested = raw.match(/^  ([A-Za-z0-9_-]+):\s*(.*)$/);
    if (nested && currentMap) {
      currentMap[nested[1]] = nested[2].replace(/^"(.*)"$/, '$1');
      continue;
    }
    const cont = raw.match(/^  (\S.*)$/);
    if (cont && currentKey && !currentMap) {
      buffer.push(cont[1]);
      continue;
    }
    const top = raw.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!top) {
      errors.push(`${file}: cannot parse frontmatter line: ${raw}`);
      continue;
    }
    flush();
    currentKey = top[1];
    currentMap = null;
    const value = top[2];
    if (!/^["'|>]/.test(value) && /: |:$| #|^[@`*&!%{[]/.test(value))
      errors.push(`${file}: frontmatter.${currentKey} needs quotes (an unquoted value with ": ", " #" or a leading YAML indicator breaks strict parsers)`);
    if (value === '' || value === '|' || value === '>') {
      if (['metadata'].includes(currentKey)) {
        currentMap = {};
        fm[currentKey] = currentMap;
      } else {
        buffer = [];
      }
    } else {
      fm[currentKey] = value.replace(/^"(.*)"$/, '$1');
      currentKey = value === '' ? currentKey : null;
    }
  }
  flush();
  return { fm, body: text.slice(end + 4) };
}

function validateSkill(name) {
  const dir = join(SKILLS_DIR, name);
  const file = `skills/${name}/SKILL.md`;
  const path = join(dir, 'SKILL.md');
  if (!existsSync(path)) {
    errors.push(`${file}: missing`);
    return;
  }
  const text = readFileSync(path, 'utf8');
  const parsed = parseFrontmatter(text, file);
  if (!parsed) return;
  const { fm, body } = parsed;

  // name
  if (!fm.name) errors.push(`${file}: frontmatter.name is required`);
  else {
    if (fm.name !== name) errors.push(`${file}: name "${fm.name}" must equal folder "${name}"`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(fm.name) || fm.name.length > 64)
      errors.push(`${file}: name must be 1-64 chars of [a-z0-9-], no leading/trailing/double hyphens`);
  }
  // description
  if (!fm.description) errors.push(`${file}: frontmatter.description is required`);
  else {
    if (fm.description.length > 1024) errors.push(`${file}: description exceeds 1024 chars (${fm.description.length})`);
    if (fm.description.length > 500) warnings.push(`${file}: description is ${fm.description.length} chars, aim under 500 (it is loaded for every skill in every chat)`);
    if (!/tubelab/i.test(fm.description)) warnings.push(`${file}: description should say it requires the TubeLab MCP (routing convention)`);
  }
  if (fm.compatibility && fm.compatibility.length > 500) errors.push(`${file}: compatibility exceeds 500 chars`);
  if (fm.metadata && typeof fm.metadata === 'object') {
    for (const [k, v] of Object.entries(fm.metadata)) {
      if (typeof v !== 'string') errors.push(`${file}: metadata.${k} must be a string`);
    }
  }
  // size
  const lines = text.split('\n').length;
  if (lines >= 500) errors.push(`${file}: ${lines} lines, keep SKILL.md under 500 (cut, do not add files)`);
  // links (fenced blocks are artifact layouts and examples, not links)
  const prose = body.replace(/```[\s\S]*?```/g, '');
  const linkRe = /\]\((?!https?:|mailto:|#)([^)\s]+)\)/g;
  for (const m of prose.matchAll(linkRe)) {
    const target = m[1].split('#')[0];
    if (!target) continue;
    const abs = resolve(dir, target);
    if (!existsSync(abs)) errors.push(`${file}: link target not found: ${m[1]}`);
  }
  const pathRe = /`(scripts\/[A-Za-z0-9_./-]+)`/g;
  for (const m of prose.matchAll(pathRe)) {
    if (!existsSync(resolve(dir, m[1]))) errors.push(`${file}: referenced file not found: ${m[1]}`);
  }
  // hard-coded dates
  for (const m of body.matchAll(/\b\d{4}-\d{2}-\d{2}\b/g)) {
    errors.push(`${file}: hard-coded date "${m[0]}" (use recency tokens: month, trimester, semester, year)`);
  }
  // workflow skills are self-contained: output layout inline, no generated or side files
  for (const extra of ['PROMPT.md', 'assets', 'references']) {
    if (existsSync(join(dir, extra))) errors.push(`${file}: remove ${extra} and fold it into SKILL.md (every skill is one file)`);
  }
  if (!DATA_SKILLS.has(name)) {
    if (!/^## Output Format\s*$/m.test(body)) errors.push(`${file}: workflow skill needs an "## Output Format" section with the artifact layout inline`);
    const words = text.replace(/```[\s\S]*?```/g, '').split(/\s+/).filter(Boolean).length;
    if (words > 650) warnings.push(`${file}: ${words} words of instruction outside fenced blocks, aim for 650 or fewer`);
    const descWords = (fm.description || '').split(/\s+/).filter(Boolean).length;
    if (descWords > 40) warnings.push(`${file}: description is ${descWords} words, keep it under 40`);
    if (/\.\.\/tubelab-mcp\//.test(body)) errors.push(`${file}: do not link into ../tubelab-mcp; name the skill in prose so SKILL.md stands alone when uploaded or pasted`);
  }
}

const names = readdirSync(SKILLS_DIR).filter((n) => statSync(join(SKILLS_DIR, n)).isDirectory());
const selected = only.length ? names.filter((n) => only.includes(n)) : names;
if (!selected.length) {
  console.error('no skills found');
  process.exit(1);
}
for (const n of selected) validateSkill(n);

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`error ${e}`);
console.log(`${selected.length} skill(s) checked: ${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);

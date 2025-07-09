import { AbstractControl, ValidationErrors } from '@angular/forms';

export function commaSeparatedValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!value || typeof value !== 'string') return null;

  const hasComma = value.includes(',');
  const hasSpace = value.trim().includes(' ');

  const tags = value.split(',').map(tag => tag.trim());
  const nonEmptyTags = tags.filter(tag => tag.length > 0);

  // Case 1: Single tag, no comma, no space — valid
  if (!hasComma && !hasSpace && nonEmptyTags.length === 1) {
    return null;
  }

  // Case 2: Multiple comma-separated tags, none are empty, and each tag is a single word
  const allValid = nonEmptyTags.length >= 2 && nonEmptyTags.length === tags.length && nonEmptyTags.every(tag => !tag.includes(' '));

  if (allValid) {
    return null;
  }

  // Invalid otherwise
  return { commaSeparated: 'Enter a single tag or multiple tags separated by commas (no spaces within tags).' };
}

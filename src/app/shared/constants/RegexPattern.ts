export const Pattern = {
  integerNumber: '^(0|[-+]?[1-9][0-9]*)$',
  commaNotationNumber: '^[+-]?(([1-9][0-9]*)?[0-9](.[0-9]*)?|.[0-9]+)$',
  link: '(?:https?://)?(?:www.)?youtu(?:.be/|be.com/S*(?:watch|embed)(?:(?:(?=/[^&s?]+(?!S))/)|(?:S*v=|v/)))([^&s?]+)',
};

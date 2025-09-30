export const errors = {
  password_regex: 'Password must contain at least one number or letter',
  password_max: 'Password must be at most 16 characters.',
  password_min: 'Password must be at least 8 characters.',
  password_required: 'Password required.',

  email_max: 'Email must be at most 100 characters',
  email_min: 'Email must be at least 6 characters',
  email_required: 'Required mail.',
  email: 'Invalid mail!',

  name_max: 'Name must be at most 100 characters',
  name_min: 'Name must be at least 3 characters',
  name_required: 'Required name.',

  pagination_required: 'Pagination values are mandatory.',
  pagination: 'The value 0 is not accepted in pagination.',
  pagination_positive: 'Enter only positive values.',
  pagination_int: 'Enter only integer values.',

  boolean_invalid: { message: "You need to enter a 'true' or 'false' value." },

  required_field: 'Required field',

  url: 'Invalid URL!',
  id: 'Invalid ID!'
}

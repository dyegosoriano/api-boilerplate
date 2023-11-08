export const errors = {
  password_regex: 'Password must contain at least one number or letter',
  password_required: { required_error: 'Password required.' },
  password_max: 'Password must be at most 16 characters.',
  password_min: 'Password must be at least 8 characters.',

  email_required: { required_error: 'Required mail.' },
  email_max: 'Email must be at most 100 characters',
  email_min: 'Email must be at least 6 characters',
  email: 'Invalid mail!',

  name_required: { required_error: 'Required name.' },
  name_max: 'Name must be at most 100 characters',
  name_min: 'Name must be at least 3 characters',

  pagination_required: { required_error: 'Pagination values are mandatory.' },
  pagination: 'The value 0 is not accepted in pagination.',
  pagination_positive: 'Enter only positive values.',
  pagination_int: 'Enter only integer values.',

  boolean_invalid: { message: "You need to enter a 'true' or 'false' value." },

  required_field: { required_error: 'Required field' },

  url: 'Invalid URL!',
  id: 'Invalid ID!'
}

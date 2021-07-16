# Inputs

Each input shall:

1. Have a prop called formName which maps to a location in both collection.shape and form (eg "id" means collection.shape.id + form.id)
2. Be controlled and integrated with the form state, ie will be rendered without value or update functions
3. Use the collection.shape type to render the various types of inputs
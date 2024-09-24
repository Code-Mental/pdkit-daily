const mongoose = require('mongoose');

// Define the schema for each set of dynamic fields with color quantities

const dynamicFieldSet1Schema = new mongoose.Schema({
  price: { type: String, required: true },
  colors: {
    green: { type: Number },
    black: { type: Number },
    blue: { type: Number },
    red: { type: Number },
    yellow: { type: Number },
    brown: { type: Number },
    pink: { type: Number },
    sky: { type: Number },
    grey: { type: Number },
    multiColor: { type: Number },
    orange: { type: Number },
    purple: { type: Number },
    white: { type: Number }  // Added
  },
  selectedColors: {
    green: { type: Boolean },
    black: { type: Boolean },
    blue: { type: Boolean },
    red: { type: Boolean },
    yellow: { type: Boolean },
    brown: { type: Boolean },
    pink: { type: Boolean },
    sky: { type: Boolean },
    grey: { type: Boolean },
    multiColor: { type: Boolean },
    orange: { type: Boolean },
    purple: { type: Boolean },
    white: { type: Boolean }  // Added
  }
});

const dynamicFieldSet2Schema = new mongoose.Schema({
  size: { type: String, required: true },
  length: { type: String, required: true },
  width: { type: String, required: true },
  height: { type: String, required: true },

  price: { type: String, required: true },
  colors: {
    green: { type: Number },
    black: { type: Number },
    blue: { type: Number },
    red: { type: Number },
    yellow: { type: Number },
    brown: { type: Number },
    pink: { type: Number },
    sky: { type: Number },
    grey: { type: Number },
    multiColor: { type: Number },
    orange: { type: Number },
    purple: { type: Number },
    white: { type: Number }  // Added
  },
  selectedColors: {
    green: { type: Boolean },
    black: { type: Boolean },
    blue: { type: Boolean },
    red: { type: Boolean },
    yellow: { type: Boolean },
    brown: { type: Boolean },
    pink: { type: Boolean },
    sky: { type: Boolean },
    grey: { type: Boolean },
    multiColor: { type: Boolean },
    orange: { type: Boolean },
    purple: { type: Boolean },
    white: { type: Boolean }  // Added
  }
});

const dynamicFieldSet3Schema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  colors: {
    green: { type: Number },
    black: { type: Number },
    blue: { type: Number },
    red: { type: Number },
    yellow: { type: Number },
    brown: { type: Number },
    pink: { type: Number },
    sky: { type: Number },
    grey: { type: Number },
    multiColor: { type: Number },
    orange: { type: Number },
    purple: { type: Number },
    white: { type: Number }  // Added
  },
  selectedColors: {
    green: { type: Boolean },
    black: { type: Boolean },
    blue: { type: Boolean },
    red: { type: Boolean },
    yellow: { type: Boolean },
    brown: { type: Boolean },
    pink: { type: Boolean },
    sky: { type: Boolean },
    grey: { type: Boolean },
    multiColor: { type: Boolean },
    orange: { type: Boolean },
    purple: { type: Boolean },
    white: { type: Boolean }  // Added
  }
});

const dynamicFieldSet4Schema = new mongoose.Schema({
  description: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  colors: {
    green: { type: Number },
    black: { type: Number },
    blue: { type: Number },
    red: { type: Number },
    yellow: { type: Number },
    brown: { type: Number },
    pink: { type: Number },
    sky: { type: Number },
    grey: { type: Number },
    multiColor: { type: Number },
    orange: { type: Number },
    purple: { type: Number },
    white: { type: Number }  // Added
  },
  selectedColors: {
    green: { type: Boolean },
    black: { type: Boolean },
    blue: { type: Boolean },
    red: { type: Boolean },
    yellow: { type: Boolean },
    brown: { type: Boolean },
    pink: { type: Boolean },
    sky: { type: Boolean },
    grey: { type: Boolean },
    multiColor: { type: Boolean },
    orange: { type: Boolean },
    purple: { type: Boolean },
    white: { type: Boolean }  // Added
  }
});
const dynamicFieldSet5Schema = new mongoose.Schema({
  chest_girth: { type: String },
  date: { type: String },
  amount: { type: Number, required: true },
  colors: {
    green: { type: Number },
    black: { type: Number },
    blue: { type: Number },
    red: { type: Number },
    yellow: { type: Number },
    brown: { type: Number },
    pink: { type: Number },
    sky: { type: Number },
    grey: { type: Number },
    multiColor: { type: Number },
    orange: { type: Number },
    purple: { type: Number },
    white: { type: Number }  // Added
  },
  selectedColors: {
    green: { type: Boolean },
    black: { type: Boolean },
    blue: { type: Boolean },
    red: { type: Boolean },
    yellow: { type: Boolean },
    brown: { type: Boolean },
    pink: { type: Boolean },
    sky: { type: Boolean },
    grey: { type: Boolean },
    multiColor: { type: Boolean },
    orange: { type: Boolean },
    purple: { type: Boolean },
    white: { type: Boolean }  // Added
  }
});
const dynamicFieldSet6Schema = new mongoose.Schema({
  length: { type: String },
  width: { type: String },
  height:{type:String},
  amount: { type: Number, required: true },
  colors: {
    green: { type: Number },
    black: { type: Number },
    blue: { type: Number },
    red: { type: Number },
    yellow: { type: Number },
    brown: { type: Number },
    pink: { type: Number },
    sky: { type: Number },
    grey: { type: Number },
    multiColor: { type: Number },
    orange: { type: Number },
    purple: { type: Number },
    white: { type: Number }  // Added
  },
  selectedColors: {
    green: { type: Boolean },
    black: { type: Boolean },
    blue: { type: Boolean },
    red: { type: Boolean },
    yellow: { type: Boolean },
    brown: { type: Boolean },
    pink: { type: Boolean },
    sky: { type: Boolean },
    grey: { type: Boolean },
    multiColor: { type: Boolean },
    orange: { type: Boolean },
    purple: { type: Boolean },
    white: { type: Boolean }  // Added
  }
});
const dynamicFieldSet7Schema = new mongoose.Schema({
  description: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  colors: {
    green: { type: Number },
    black: { type: Number },
    blue: { type: Number },
    red: { type: Number },
    yellow: { type: Number },
    brown: { type: Number },
    pink: { type: Number },
    sky: { type: Number },
    grey: { type: Number },
    multiColor: { type: Number },
    orange: { type: Number },
    purple: { type: Number },
    white: { type: Number }  // Added
  },
  selectedColors: {
    green: { type: Boolean },
    black: { type: Boolean },
    blue: { type: Boolean },
    red: { type: Boolean },
    yellow: { type: Boolean },
    brown: { type: Boolean },
    pink: { type: Boolean },
    sky: { type: Boolean },
    grey: { type: Boolean },
    multiColor: { type: Boolean },
    orange: { type: Boolean },
    purple: { type: Boolean },
    white: { type: Boolean }  // Added
  }
});

const dynamicFieldSet8Schema = new mongoose.Schema({
  length: { type: String},
  height: { type: String },
  size: { type: String },
  price: { type: Number, required: true },
  colors: {
    green: { type: Number },
    black: { type: Number },
    blue: { type: Number },
    red: { type: Number },
    yellow: { type: Number },
    brown: { type: Number },
    pink: { type: Number },
    sky: { type: Number },
    grey: { type: Number },
    multiColor: { type: Number },
    orange: { type: Number },
    purple: { type: Number },
    white: { type: Number }  // Added
  },
  selectedColors: {
    green: { type: Boolean },
    black: { type: Boolean },
    blue: { type: Boolean },
    red: { type: Boolean },
    yellow: { type: Boolean },
    brown: { type: Boolean },
    pink: { type: Boolean },
    sky: { type: Boolean },
    grey: { type: Boolean },
    multiColor: { type: Boolean },
    orange: { type: Boolean },
    purple: { type: Boolean },
    white: { type: Boolean }  // Added
  }
});
// Define the main schema

const productSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  product_id: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  dynamicFields1: [dynamicFieldSet1Schema],
  dynamicFields2: [dynamicFieldSet2Schema],
  dynamicFields3: [dynamicFieldSet3Schema],
  dynamicFields4: [dynamicFieldSet4Schema],
  dynamicFields5: [dynamicFieldSet5Schema],
  dynamicFields6: [dynamicFieldSet6Schema],
  dynamicFields7: [dynamicFieldSet7Schema],
  dynamicFields8:[dynamicFieldSet8Schema]
  
});

// Create and export the model

module.exports = mongoose.model('Product1', productSchema);

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Your Express app
const api = supertest(app);
const Property = require("../models/propertyModel");

const properties = [
  {
    title: "Luxury Apartment",
    type: "Apartment",
    description: "A beautiful luxury apartment in downtown.",
    price: 500000,
    location: {
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001"
    },
    squareFeet: 1500,
    yearBuilt: 2015
  },
  {
    title: "Cozy Suburban House",
    type: "House",
    description: "A cozy home in a quiet suburb.",
    price: 350000,
    location: {
      address: "456 Elm St",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001"
    },
    squareFeet: 2000,
    yearBuilt: 2005
  }
];

describe("Property Controller", () => {
  beforeEach(async () => {
    await Property.deleteMany({});
    await Property.insertMany(properties);
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  // Test GET /api/properties
  it("should return all properties as JSON when GET /api/properties is called", async () => {
    const response = await api
      .get("/api/properties")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(properties.length);
  });

  // Test POST /api/properties
  it("should create a new property when POST /api/properties is called", async () => {
    const newProperty = {
      title: "Modern Condo",
      type: "Condo",
      description: "A stylish modern condo with ocean views.",
      price: 600000,
      location: {
        address: "789 Ocean Dr",
        city: "Miami",
        state: "FL",
        zipCode: "33139"
      },
      squareFeet: 1800,
      yearBuilt: 2018
    };

    await api
      .post("/api/properties")
      .send(newProperty)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const propertiesAfterPost = await Property.find({});
    expect(propertiesAfterPost).toHaveLength(properties.length + 1);
    const propertyTitles = propertiesAfterPost.map((property) => property.title);
    expect(propertyTitles).toContain(newProperty.title);
  });
});

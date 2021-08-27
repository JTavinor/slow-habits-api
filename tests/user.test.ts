const { User, validate } = require("../src/models/user");

describe("User validation", () => {
  it("should be invalid if name is empty", async () => {
    const user = new User();

    console.log(validate(user));
    const result = await user.save();
    console.log("RESULT", result.message);
    // expect(validate(user).error).toBeTruthy();
  });

  it("should return true if given a valid user", () => {
    const user = new User({
      name: "Bob",
      email: "bob@gmail.com",
      password: "12345",
    });
    console.log(validate(user));
  });
});

const { User } = require("../src/models/user");

describe("User validation", () => {
  it("should be invalid if name is empty", async () => {
    const user = new User();

    const result = await user.save();
    console.log("RESULT", result.message);
    // console.log(validate(user));
    // expect(validate(user).error).toBeTruthy();
  });

  // it("should return true if given a valid user", () => {
  //   const user = new User({
  //     name: "Bob",
  //     email: "bob@gmail.com",
  //     password: "12345",
  //   });
  //   console.log(validate(user));
  // });
});

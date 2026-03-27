import { FormatMobPipe } from "./format-mob.pipe";

describe('FormatMobPipe', () => {
  it('should format the mobile number to Indian format by default ', () => {
    const pipe = new FormatMobPipe();
    const result = pipe.transform(1234567890);
    expect(result).toBe('+91-1234567890');
  });
  it('should format the mobile number to USA format when country is USA', () => {
    const pipe = new FormatMobPipe();
    const result = pipe.transform(1234567890, "USA");
    expect(result).toBe('+1-1234567890');
  });
});

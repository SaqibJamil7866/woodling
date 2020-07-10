
export default function ValidateContact(number) {
    if (
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(
        number
      )
    ) {
      return true;
    }
    return false;
  }
  
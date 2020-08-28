
export default function priceValidator(number) {
    if (
        /^\d+(,\d{3})*(\.\d{1,2})?$/gm.test(
        number
      )
    ) {
      return true;
    }
    if(number===''){
        return true
    }
    return false;
  }
  
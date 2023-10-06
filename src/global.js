import IMask from "imask";
export const formatNumber_ = (val = 0, scale = 0) => {
  let mask = IMask.createMask({
    mask: Number,
    scale,
    min: -9999999999999,
    thousandsSeparator: ",",
    radix: ".",
  });
  let val_num = typeof val == "string" ? val.trim() : val;
  let num = (val_num || 0).toString().replace(/^0+/, "");
  mask.resolve(num);
  return `${mask.value}`;
};

export const imageBase64_ = (url) => {
  return new Promise((res) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        res(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  });
};

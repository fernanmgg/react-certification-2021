function charCodeReplace(input) {
  return input
    .replace(/&#(\d+);/g, (_, code) => {
      return String.fromCharCode(parseInt(code, 10));
    })
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"');
}

export default charCodeReplace;

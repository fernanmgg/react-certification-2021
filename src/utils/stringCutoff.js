function stringCutoff(input, maxLength) {
  return input.length <= maxLength
    ? input
    : input.slice(0, maxLength).replace(/\s\S*$/, ' ...');
}

export default stringCutoff;

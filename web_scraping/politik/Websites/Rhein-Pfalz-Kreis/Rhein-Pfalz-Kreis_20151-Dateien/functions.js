function closeModal(event) {
  if (!event) {
    event = window.event; // IE
  }

  const clickedElement = (event.target || event.srcElement);

  if (clickedElement.className === 'card-container' || clickedElement.className === 'modal-container') {
    clickedElement.style.display = 'none';
  }
}

function fuzzyMatch(needle, haystack) {
  needle = `.*${needle.split('').join('.*')}.*`;
  const re = new RegExp(needle);

  return re.test(haystack);
}

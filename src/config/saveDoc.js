export default function saveDoc(dom, filename) {
  if (!window.Blob) {
    alert('Your legacy browser does not support this action.');
    return;
  }

  var html, link, blob, url, css;

  // A4 use: size: 841.95pt 595.35pt;
  css = (
    '<style>' +
    '@page {mso-page-orientation: portrait;size: 841.95pt 595.35pt;}' +
    '@page WordSection1 {margin: 36pt 36pt 36pt 36pt;mso-page-orientation: portrait;size: 841.95pt 595.35pt;}' +
    'div.WordSection1 {page: WordSection1;}' +
    'table {border-collapse: collapse;}' + 
    'td {border: 1px #000 solid;padding: 2px 8px;}' +
    '</style>'
  );

  html = dom.innerHTML;
  html = '<div class="WordSection1">' + html + '</div>'

  blob = new Blob(['\ufeff', css + html], {
    type: 'application/msword'
  });

  if (navigator.msSaveOrOpenBlob) {
    navigator.msSaveOrOpenBlob( blob, filename + '.doc'); // IE10-11
  } else {
    url = URL.createObjectURL(blob);
    link = document.createElement('a');
    link.download = filename;  
    link.href = url;

    document.body.appendChild(link);
    link.click(); // other browsers
    document.body.removeChild(link);
  }
}
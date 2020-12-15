export function dowloadexcel(res) {
  const blob = new Blob([res.data], { type: 'application/vnd.ms-excel;charset=utf-8' })

  var link = document.createElement('a')

  link.href = window.URL.createObjectURL(blob)
  link.download = decodeURI(res.headers.filename)
  link.click()
}

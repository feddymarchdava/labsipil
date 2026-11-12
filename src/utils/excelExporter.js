export async function exportLabReport(args) {
  const { buildLabWorkbook } = await import('./excelLabGenerator.js')
  const { buffer, fileName } = await buildLabWorkbook(args)

  if (typeof window !== 'undefined') {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    link.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return { success: true, fileName, bufferSize: buffer.byteLength }
}

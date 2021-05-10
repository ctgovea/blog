import React from "react"
import downloadFile from '../../static/cv.pdf'

const CVPage = () => (
    <>
        <a href={downloadFile} download>Download the directly imported file</a>{` `}
    </>
)

export default CVPage
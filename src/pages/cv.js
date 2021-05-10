import React from "react"
import downloadFile from '../../static/cv.pdf'

const CVPage = () => (
    <>
        <object data={downloadFile} type="application/pdf" width="100%" height="100%">
            <p>You can download the <a href={downloadFile}>cv file</a></p>
        </object>
    </>
)

export default CVPage
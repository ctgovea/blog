import React from "react"

const CVPage = () => (
    <>
        <object data="./cv.pdf" type="application/pdf" width="700px" height="700px">
            <embed src="cv.pdf">
                <p>This browser does not support PDFs. Please download the PDF to view it: <a href="cv.pdf">Download PDF</a>.</p>
            </embed>
        </object>
    </>
)

export default CVPage
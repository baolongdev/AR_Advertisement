import React from 'react'

export default function InfoContainer({email}) {
    return (
        <div className="info_container">
            <a
                // target="_blank"
                rel="noreferrer"
                className="info_textLink"
                href="#"
            >
                {email&& (
                    <p className="info_text" style={{ background: "#ffffff", color: "#000000" }}>@{email.split('@')[0]}</p>
                )}
            </a>
        </div>
    )
}

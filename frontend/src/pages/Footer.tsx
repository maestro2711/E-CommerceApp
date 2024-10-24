import React from "react";
import {styles} from '../styles/styling.ts'

const Footer:React.FC = () => {




    return (
        <footer style={styles.footer}>
            <div style={styles.footerContainer}>
                <div style={{fontSize:'1.125rem',fontWeight:'600',marginBottom:'1rem'}}>
                    <h3>Über uns</h3>
                    <p style={styles.footerText}>
                        Unserer Shop bietet Ihnen die neuesten Modetrends zu erschwinglichen Preisen.
                    </p>
                </div>
                <div style={{fontSize:'1.125rem',fontWeight:'600',marginBottom:'1rem'}}>
                    <h3>Kontakt</h3>
                    <p style={styles.footerText}>Email: asmitterand@yahoo.fr</p>
                    <p style={styles.footerText}>Telefon: +49 123 456789</p>
                </div>
                <div style={{fontSize:'1.125rem',fontWeight:'600',marginBottom:'1rem'}}>
                    <h3>Folgen Sie uns</h3>
                    <div style={styles.socialLinks}>
                        <a href="#" style={styles.socialLink}>Facebook</a>
                        <a href="#" style={styles.socialLink}>Instagram</a>
                        <a href="#" style={styles.socialLink}>Tik Tok</a>
                    </div>
                </div>
            </div>
            <div style={{borderTop:'1px solid #444',marginTop:'2rem',paddingTop:'2rem',textAlign:'center',color:'#999'}}>
                <p>&copy; 2024 Mitterand E-CommerceApp. Alle Rechte vorbehalten.</p>
            </div>
        </footer>
    )
}
export default Footer
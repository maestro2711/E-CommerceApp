export const styles = {
    header: {
    backgroundColor: '#ffffff',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
    padding: '1rem 0',
},
headerContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
},
logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1976d2',
    textDecoration: 'none',
},
nav: {
    display: 'flex',
    gap: '1rem',
},
navLink: {
    color: '#666',
    textDecoration: 'none',
'&:hover': {
    color: '#1976d2',
},
},
iconButton: {
    padding: '0.5rem',
    color: '#666',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
'&:hover': {
    color: '#1976d2',
},
},
heroSection: {
    backgroundColor: '#1976d2',
    color: '#ffffff',
    padding: '5rem 1rem',
    textAlign: 'center',
},
heroTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
},
heroButton: {
    backgroundColor: '#ffffff',
    color: '#1976d2',
    padding: '0.75rem 2rem',
    border: 'none',
    borderRadius: '9999px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '2rem',
'&:hover': {
    backgroundColor: '#f5f5f5',
},
},
productsSection: {
    padding: '4rem 1rem',
    maxWidth: '1200px',
    margin: '0 auto',
},
productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    padding: '2rem 0',
},
productCard: {
    backgroundColor: '#ffffff',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
},

productContent: {
    padding: '1rem',
},
productTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
},
productPrice: {
    color: '#666',
},
addToCartButton: {
    width: '100%',
    backgroundColor: '#1976d2',
    color: '#ffffff',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '0.375rem',
    marginTop: '1rem',
    cursor: 'pointer',
'&:hover': {
    backgroundColor: '#1565c0',
},
},
footer: {
    backgroundColor: '#333',
    color: '#ffffff',
    padding: '2rem 0',
},
footerContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
},
footerSection: {
'& h3': {
    fontSize: '1.125rem',
    fontWeight: '600',
    marginBottom: '1rem',
},
},
footerText: {
    color: '#999',
},
socialLinks: {
    display: 'flex',
    gap: '1rem',
},
socialLink: {
    color: '#999',
    textDecoration: 'none',
'&:hover': {
    color: '#ffffff',
},
},
footerBottom: {
    borderTop: '1px solid #444',
    marginTop: '2rem',
    paddingTop: '2rem',
    textAlign: 'center',
    color: '#999',
},
};

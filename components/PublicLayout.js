import Header from './Header.js';

const Footer = {
    width: "100%",
    height: "100px",
    backgroundColor: "red"
};

const PublicLayout = (props) => {
    return(
        <>
            <Header />
            <section>
                <div className = "container">
                    <div className = "content">
                    {props.children}
                    </div>
                </div>
            </section>
        </>
    );
}


export default PublicLayout;

import Nav from '@components/Nav';
import '@styles/globals.css';
import Provider from '@components/Provider';

export const metadata = {
    title: 'Promptly',
    description: 'Discover & Share AI prompts'
};

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <head><link rel="icon" href="/assets/icons/promptly.ico" sizes="any" /></head>
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient" />
                    </div>
                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    );
};

export default RootLayout;
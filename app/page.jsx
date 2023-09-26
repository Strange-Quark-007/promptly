import Feed from "@components/Feed";

const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Discover & Share
                <br className="max-md:hidden" />
                <span className="orange_gradient">AI-powered Prompts</span>
            </h1>
            <div className="mt-5">
                <p className="desc text-center">
                    Your go-to platform for discovering and sharing AI prompts, perfect for enhancing conversations with AI chatbots like chatGPT, etc.
                </p>
                <p className="desc text-center">
                    Unleash the power of AI-generated prompts effortlessly and fuel your creativity like never before.
                </p>
            </div>

            <Feed />

        </section>
    );
};

export default Home;
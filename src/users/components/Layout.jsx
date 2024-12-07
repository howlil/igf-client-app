import Navbar from "./Navbar"


export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main className=" mx-4 md:mx-16 my-8 md:my-12">
                {children}
            </main>
        </>
    )
}

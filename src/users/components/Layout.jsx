import Navbar from "./Navbar"


export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main className=" mx-20 my-12">
                {children}
            </main>
        </>
    )
}

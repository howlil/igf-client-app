import Navbar from "../navbar";

export default function Template({ content }) {
  return (
    <>
      <Navbar>
        <div className="bg-gray-200 h-screen">
          {content}
        </div>
      </Navbar>
    </>
  )
}

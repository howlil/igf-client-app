export default function LandingPage(){
    return(
        <>
        <section className="bg-gradient-to-r from-bgb2b via-white to-bgb2b h-screen">
            <img src="../../../public/ornamen.png" alt="" className="w-full"/>
            <div className="flex justify-center">
                <img src="../../../public/logo.png" alt="" className="w-1/2"/>
            </div>
            <section>
                <p>B<span>2</span>B Matchmaking</p>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima aspernatur est distinctio illo, suscipit praesentium non. Exercitationem nam eaque magnam odit facilis culpa, repellendus natus perspiciatis sapiente dolor doloribus eligendi!.</p>
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center">
                        <div className="box w-1/6 p-2">
                            <div className="content h-56">
                                <img src="../../../public/foto1.jpg" alt="Conference A" className="w-full h-full object-cover border rounded-xl"/>
                                <p>Conference A</p>
                            </div>
                        </div>
                        <div className="box w-1/6 p-2">
                            <div className="content h-56">
                                <img src="../../../public/foto2.jpg" alt="Conference B" className="w-full h-full object-cover border rounded-xl"/>
                                <p>Conference B</p>
                            </div>
                        </div>
                        <div className="box w-1/6 p-2">
                            <div className="content h-56">
                                <img src="../../../public/foto3.jpg" alt="Conference C" className="w-full h-full object-cover border rounded-xl"/>
                                <p>Conference C</p>
                            </div>
                        </div>
                        <div className="box w-1/6 p-2">
                            <div className="content h-56">
                                <img src="../../../public/foto4.jpg" alt="Conference D" className="w-full h-full object-cover border rounded-xl"/>
                                <p>Conference D</p>
                            </div>
                        </div>
                    </div>
                </div>


            </section>
        </section>
        </>
    )
}

import Question from "./Question"

function F_and_q() {
    return (
        <div className="flex flex-col gap-6 bg-secondary  items-center text-center px-[30px] md:px-[100px] py-30">
            <p className=" text-accent text-4xl">Frequently Asked Question</p>
       <p className="text-muted w-full md:w[500px] pb-8">Check out our Frequently Asked Questions section for everything you need to know about your movie streaming experience.</p>

<Question question={'What is movie land?'} answer={`movie land is not just a platform; it's your VIP pass to a universe of captivating content that transcends the ordinary. Say goodbye to the mundane and embrace the extraordinary.`} />
<Question question={'What Devices are Compatible?'} answer={`movie land is not just a platform; it's your VIP pass to a universe of captivating content that transcends the ordinary. Say goodbye to the mundane and embrace the extraordinary.`} />
<Question question={'Can I Download Movies for Offline Viewing'} answer={`movie land is not just a platform; it's your VIP pass to a universe of captivating content that transcends the ordinary. `
} />
<Question question={'What Devices are Compatible?'} answer={`movie land is not just a platform; it's your VIP pass to a universe of captivating content that transcends the ordinary. Say goodbye to the mundane and embrace the extraordinary.`} />
<Question question={'How Does Billing Work?'} answer={`movie land is not just a platform; it's your VIP pass to a universe of captivating content that transcends the ordinary. Say goodbye to the mundane and embrace the extraordinary.`} />
<Question question={'What Devices are Compatible?'} answer={`movie land is not just a platform; it's your VIP pass to a universe of captivating content that transcends the ordinary.`} />
<Question question={'What Devices are Compatible?'} answer={`movie land. Say goodbye to the mundane and embrace the extraordinary.`} />
        </div>
    )
}

export default F_and_q

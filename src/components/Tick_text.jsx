
import tick from '../image/tick.svg'
function Tick_text({children}) {
    return (
      <div className="flex items-start gap-2">
      <img src={tick}  />
      <p className="text-accent ">{children}</p>
    </div>
    )
}

export default Tick_text

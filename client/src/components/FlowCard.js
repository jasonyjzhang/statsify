export default function FlowCard({ number, icon, alt, text }) {
  return (
    <div className="flex md:flex-col justify-center items-center py-6 gap-x-8 md:gap-y-4">
      <p className="md:hidden text-dark-gray text-2xl">{number}</p>
      <img src={icon} alt={alt} className="w-12 md:w-16"/>
      <p className="hidden md:inline text-dark-gray">Step {number}</p>
      <p className="w-1/2 md:w-48 text-start md:text-center">{text}</p>
    </div>
  )
};
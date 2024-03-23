import { hamburger } from '../assets/icons'
import { headerLogo } from '../assets/images'
import { navLinks } from '../constants'

const Nav = () => {
  return (
    <header className='padding-x py-8 absolute z-10 w-full'>
      <nav className='flex justify-between items-center max-container' >
        <a href='/'>
          <img src={headerLogo} alt="logo" width={130} height={29}/>
        </a>
        <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden text-l'>{navLinks.map((link) => (<li key={link.label}><a className='text-slate-gray text-lg font-montserrat leading-normal ' href={link.href}>
          {link.label}
          </a></li>))}

        </ul>
        <div className='hidden max-lg:block'>
          <img src={hamburger} alt="Hamburger" width={25} height={25} />
        </div>
        <button className='text-lg font-montserrat text-black pe-20'>
          Sign in / Explore now
        </button>
      </nav>
    </header>
  )
}

export default Nav
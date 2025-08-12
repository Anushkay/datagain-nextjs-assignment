'use client';

import BellIcon from '@/app/icons/BellIcon';
import DownIcon from '@/app/icons/DownIcon';
import GridMenuIcon from '@/app/icons/GridMenuIcon';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import Image from 'next/image';
import SearchBar from '../search-bar';

export default function Header() {
    return (
        <header className="w-full h-[60px] z-30 flex items-center px-4 py-2.5">
            <div className="flex items-center gap-6 flex-shrink-0">
                {/* Logo */}
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={158}
                    height={36}
                    className="object-contain"
                />
            </div>

            <div className="flex-1 justify-end flex gap-[12.23px] mr-6">
                <div className="flex items-center gap-1 text-sm font-sans font-medium text-gray-700 cursor-pointer">
                    <span className='text-[12px] text-[#2C4E6C] font-semibold'>Client Workspace:</span>

                    <Dropdown backdrop="transparent">
                        <DropdownTrigger className="p-0 rounded-md border-[0.75px] border-gray-100">
                            <Button
                                className='width-[100px] h-[40px]'
                                startContent={<Image src={'../clientProfile.svg'} alt={'Client Profile'} width={27.85} height={20} />}
                                endContent={<DownIcon size={16} />}
                                variant="bordered"
                                size='lg'
                            >
                                &nbsp;
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions" variant="faded">
                            <DropdownItem key="1">Workspace 1</DropdownItem>
                            <DropdownItem key="2">Workspace 2</DropdownItem>
                            <DropdownItem key="3">Workspace 3</DropdownItem>
                            <DropdownItem key="add" className="text-success" color="success">
                                Add Workspace
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
               
               {    /* Search Bar */}
                <SearchBar width="480px" height="40px" filterValue='' setFilterValue={() => {}} />
            </div>

            <div className="flex items-center gap-5">
                <div className='flex gap-2'>
                    <Image
                        src="/clientProfile.svg"
                        alt="Workspace Icon"
                        width={41}
                        height={30}
                        className="object-contain cursor-pointer"
                    />
                    <Image
                        src="/userProfile.svg"
                        alt="Workspace Icon"
                        width={30}
                        height={30}
                        className="object-contain cursor-pointer"
                    />
                </div>
                <span className='text-gray-300'>|</span>
      
                <BellIcon size='lg' color='#2C4E6C' tooltip='Notify' />

                <span className='text-gray-300'>|</span>

                <GridMenuIcon size='lg' color='#2C4E6C' tooltip='Menu'/>
            </div>
        </header>
    );
}

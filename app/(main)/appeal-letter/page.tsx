'use client';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { addAppeal, updateAppeal, removeAppeal, setAppeals } from '@/app/store/slices/appealSlice';
import { RootState } from '@/app/store/store';
import { 
  Button, 
  useDisclosure, 
  Alert, 
  Card, 
  Dropdown, 
  DropdownItem, 
  DropdownMenu, 
  DropdownTrigger, 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell,
  Selection,
  Chip
} from '@heroui/react';
import ConfirmationModal from '@/app/components/confirmation-modal/ConfirmationModal';
import SearchBar from '@/app/components/search-bar';
import ActionIcon from '@/app/icons/ActionIcon';
import FilterIcon from '@/app/icons/FilterIcon';
import AppealFormModal from './components/AppealFormModal';
import { APPEAL_DATA } from './constant';
import { Appeal } from './types';
import SelectionAlert from './components/SelectionAlert';

export default function AppealLetterPage() {

  // States mamagement
  const dispatch = useAppDispatch();
  const appeals = useAppSelector((state: RootState) => state.appeal.items);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const [editingAppeal, setEditingAppeal] = useState<Appeal | undefined>(undefined);
  const [filterValue, setFilterValue] = useState('');
  const [page, setPage] = useState(1);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string , position: string} | null>(null);
  const rowsPerPage = 3;
  const [gotoPageInput, setGotoPageInput] = useState('');

  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();

  //Effects

  useEffect(() => {
    if (appeals.length === 0) {
      dispatch(setAppeals(APPEAL_DATA));
    }
  }, [dispatch, appeals]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  // Handlers
  const filteredItems = appeals.filter(item =>
    item.company?.toLowerCase()?.includes(filterValue.toLowerCase()) ||
    item.state?.toLowerCase()?.includes(filterValue.toLowerCase()) ||
    item.assessor?.toLowerCase()?.includes(filterValue.toLowerCase()) ||
    item.accountNumber?.toLowerCase()?.includes(filterValue.toLowerCase()) ||
    item.appealedBy?.toLowerCase()?.includes(filterValue.toLowerCase())
  );

  const pages = Math.ceil(filteredItems.length / rowsPerPage);
  const items = filteredItems.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleAdd = () => { setEditingAppeal(undefined); onFormOpen(); };
  const handleEdit = (appeal: Appeal) => { setEditingAppeal(appeal); onFormOpen(); };
  const handleDelete = () => {
    if ((selectedKeys !== 'all' && selectedKeys.size > 0) || selectedKeys === 'all') onConfirmOpen();
  };
  const confirmDelete = () => {
    try {
      if (selectedKeys === 'all') appeals.forEach(appeal => dispatch(removeAppeal(appeal.id)));
      else selectedKeys.forEach(id => dispatch(removeAppeal(String(id))));
      setSelectedKeys(new Set());
      setAlert({ type: 'success', message: 'Deleted successfully', position: 'top' });
      onConfirmClose();
    } catch {
      setAlert({ type: 'danger', message: 'Something went wrong',   position: 'top' });
    }
  };
  const handleSubmit = (data: Appeal) => {
    try {
      if (editingAppeal) {
        dispatch(updateAppeal({ ...data, id: editingAppeal.id }));
        setAlert({ type: 'success', message: 'Updated successfully',  position: 'top' });
      } else {
        dispatch(addAppeal(data));
        setAlert({ type: 'success', message: 'Added successfully', position: 'top' });
      }
    } catch {
      setAlert({ type: 'danger', message: 'Something went wrong', position: 'top' });
    }
  };

const handleSelectionChange = (keys: Selection) => {
  setSelectedKeys(keys);
  
  // Check if items are selected
  const selectedCount = keys === "all" 
    ? appeals.length 
    : keys.size;
  
  if (selectedCount > 0) {
    setAlert({
      type: 'success',
      message: `${selectedCount} item${selectedCount > 1 ? 's' : ''} selected`,
      position: 'bottom'
    });
    
    const timer = setTimeout(() => setAlert(null), 3000);
    return () => clearTimeout(timer);
  }
};

const formatDate = (date: Date | string) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return '';
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
  const columns = [
    { key: 'taxYear', label: 'TAX YEAR', sortable: true },
    { key: 'company', label: 'COMPANY', sortable: true },
    { key: 'state', label: 'STATE', sortable: true },
    { key: 'assessor', label: 'ASSESSOR', sortable: true },
    { key: 'accountNumber', label: 'ACCOUNT NUMBER', sortable: true },
    { key: 'appealDeadLine', label: 'APPEAL DEADLINE', sortable: true },
    { key: 'status', label: 'STATUS', sortable: true },
    { key: 'appealedDate', label: 'APPEALED DATE', sortable: true },
    { key: 'appealedBy', label: 'APPEALED BY', sortable: true },
    { key: 'actions', label: 'ACTIONS', sortable: false }
  ];

  const renderCell = (item: Appeal, columnKey: string) => {
    switch (columnKey) {
      case 'status':
        return (
          <Chip 
            variant="light" 
            className={`text-xs font-medium ${item.status === 'Sent' ? 'text-black' : 'text-red-500'}`}
          >
            {item.status}
          </Chip>
        );
      case 'appealedDate': return formatDate(item.appealedDate);
      case 'appealDeadLine': return formatDate(item.appealDeadLine);
      case 'actions':
        return (
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light"><ActionIcon size={20} /></Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key='edit-single' onPress={() => handleEdit(item)}>Edit</DropdownItem>
              <DropdownItem key='delete-single' className="text-danger" color="danger" onPress={() => {
                setSelectedKeys(new Set([item.id]));
                onConfirmOpen();
              }}>
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
      default:
        return item[columnKey as keyof Appeal]?.toString() || '';
    }
  };

  const handleGotoPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setGotoPageInput(value);
  };
  const handleGotoPageSubmit = () => {
    const num = Number(gotoPageInput);
    if (num && num >= 1 && num <= pages) setPage(num);
    setGotoPageInput('');
  };

const bottomContent = (
  <div className="w-full flex items-center justify-between py-4">
    <div className="text-sm text-gray-600">
      {items.length > 0 ? `${(page - 1) * rowsPerPage + 1}-${Math.min(page * rowsPerPage, filteredItems.length)}` : '0'} of {filteredItems.length}
    </div>

    <div className="flex items-center gap-1"> 
      <Button 
        size="sm"
        variant="light" 
        onPress={() => setPage(Math.max(1, page - 1))} 
        disabled={page === 1}
        className="text-black font-medium rounded-md px-3" 
      >
        {`<- Previous`}
      </Button>
      
      {Array.from({ length: Math.min(5, pages) }, (_, i) => {
        const pageNum = i + 1;
        return (
          <Button
            key={pageNum}
            size="sm"
            variant={pageNum === page ? "solid" : "light"}
            color={pageNum === page ? "primary" : "default"}
            className={`rounded-md px-3 ${pageNum === page ? "bg-gray-200 text-black" : "text-gray-600"}`}
            onPress={() => setPage(pageNum)}
          >
            {pageNum}
          </Button>
        );
      })}
      
      {pages > 5 && (
        <span className="px-2 text-gray-500">...</span>
      )}
      
      <Button 
        size="sm"
        variant="light" 
        onPress={() => setPage(Math.min(pages, page + 1))} 
        disabled={page === pages}
        className="text-black font-medium rounded-md px-3" 
      >
       {`Next ->`}
      </Button>
    </div>

    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Go onto</span>
      <input
        type="text"
        className="w-12 px-2 py-1 border rounded-md text-center text-sm" /* Added rounded-md */
        value={gotoPageInput}
        onChange={handleGotoPageChange}
        onKeyDown={e => e.key === 'Enter' && handleGotoPageSubmit()}
        placeholder={String(page)}
      />
      <Button 
        size="sm" 
        variant="light" 
        onPress={handleGotoPageSubmit}
        className="text-gray-600 rounded-md" 
      >
        Go
      </Button>
    </div>
  </div>
);

  return (
    <Card className="py-6 px-5 bg-white rounded-xs w-full">

      {/* top and bottom alerts */}
       {alert && alert.position === 'bottom' && (
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[9999]">
        <SelectionAlert message={alert.message} onExport={() => {} } 
                onDownload={() => {}} onChangeStatus={()=>{} } onClose={() => setAlert(null)} />
      </div>
    )}


    {alert && ( alert.position === 'top') && (
      <div className="fixed top-16 right-4 z-[9999] w-80">
        <Alert className="shadow-lg" color={alert.type} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      </div>
    )}

      {/* Table Top content */}

      <div className="mb-2 flex flex-wrap justify-end gap-3.5">
        <SearchBar width='100%' height='40px' setFilterValue={setFilterValue} filterValue={filterValue} placeholder='Search by Property, Jurisdiction, Parcel Number or Client' />
        <FilterIcon />
        <Dropdown backdrop="transparent">
          <DropdownTrigger className="p-0 rounded-md border-[0.75px] border-gray-100">
            <ActionIcon size={40} />
          </DropdownTrigger>
          <DropdownMenu aria-label="Table Actions" variant="faded" disabledKeys={[selectedKeys === "all" ? '' : selectedKeys.size === 0 ? 'delete' : '']}>
            <DropdownItem key="add" className="text-success" color="success" onPress={handleAdd}>Add New Record</DropdownItem>
            <DropdownItem key="delete" className='text-danger' onPress={handleDelete}>Delete Selected</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* main grid */}
      <div className="customScrollbar w-full max-h-[60vh] overflow-auto whitespace-nowrap min-w-[640px]">
        <Table
          className='appeal-table'
          showSelectionCheckboxes
          selectedKeys={selectedKeys}
      onSelectionChange={handleSelectionChange}
          classNames={{
            
            th: [
              "bg-[#ECF3F9]", "text-[#5F7181]", "text-xs", "font-bold", "uppercase",
              "px-3", "py-[15px]", "h-[54px]", "rounded-tl-xs", "rounded-tr-xs"
            ],
            td: "text-sm text-[#2D2E34] font-medium",
            tr: "border-b border-[#E5E7EB] hover:bg-[#F9FAFB]",
          }}
          aria-label="Appeal Letter Table"
          selectionMode="multiple"
          isStriped
          isHeaderSticky
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key} allowsSorting={column.sortable}>
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={items} emptyContent={"No appeals found"}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey as string)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {bottomContent}

      <AppealFormModal isOpen={isFormOpen} onClose={onFormClose} onSubmit={handleSubmit} initialData={editingAppeal} />
      <ConfirmationModal isOpen={isConfirmOpen} onClose={onConfirmClose} onConfirm={confirmDelete} title="Confirm Deletion" message={`Are you sure you want to delete ${selectedKeys === "all" ? 'ALL' : selectedKeys.size} item(s)?`} />
    </Card>
  );
}

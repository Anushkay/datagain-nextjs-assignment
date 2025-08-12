'use client';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { Appeal } from '../types';

interface AppealFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Appeal) => void;
  initialData?: Appeal;
}

export default function AppealFormModal({ isOpen, onClose, onSubmit, initialData }: AppealFormModalProps) {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<Appeal>({
    defaultValues: initialData || {
      taxYear: '',
      company: '',
      state: '',
      assessor: '',
      accountNumber: '',
      appealedDate: '',
      appealDeadLine: '',
      status: 'Not sent',
      appealedBy: 'New User'
    }
  });

  const handleFormSubmit = (data: Appeal) => {
    onSubmit(data);
    onClose();
    reset();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="lg" // Set a proper modal size
      className="max-h-[90vh] overflow-y-auto" // Ensure modal doesn't exceed viewport height
    >
      <ModalContent className="p-4">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <ModalHeader className="text-lg font-medium">
            {initialData ? 'Edit Appeal' : 'Add New Appeal'}
          </ModalHeader>
          <ModalBody className="space-y-3 max-h-[60vh] overflow-y-auto">
            <div className="space-y-4">
              <Input
                size="sm"
                label="Tax Year"
                className="w-full"
                {...register('taxYear', { required: 'Tax Year is required' })}
              />
              {errors.taxYear && (
                <p className="text-red-500 text-xs mt-1">{errors.taxYear.message}</p>
              )}
              
              <Input
                size="sm"
                label="Company"
                className="w-full"
                {...register('company', { required: 'Company is required' })}
              />
              {errors.company && (
                <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>
              )}
              
              <Input
                size="sm"
                label="State"
                className="w-full"
                {...register('state', { required: 'State is required' })}
              />
              {errors.state && (
                <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
              )}
              
              <Input
                size="sm"
                label="Assessor"
                className="w-full"
                {...register('assessor', { required: 'Assessor is required' })}
              />
              {errors.assessor && (
                <p className="text-red-500 text-xs mt-1">{errors.assessor.message}</p>
              )}
              
              <Input
                size="sm"
                label="Account Number"
                className="w-full"
                {...register('accountNumber', { required: 'Account Number is required' })}
              />
              {errors.accountNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.accountNumber.message}</p>
              )}
              
              <Input
                size="sm"
                type="date"
                label="Appeal Date"
                className="w-full"
                {...register('appealedDate', { required: 'Appeal Date is required' })}
              />
              {errors.appealedDate && (
                <p className="text-red-500 text-xs mt-1">{errors.appealedDate.message}</p>
              )}

                <Input
                size="sm"
                type="date"
                label="Appeal Deadline"
                className="w-full"
                {...register('appealDeadLine', { required: 'Appeal Deadline is required' })}
              />
              {errors.appealDeadLine && (
                <p className="text-red-500 text-xs mt-1">{errors.appealDeadLine.message}</p>
              )}
            </div>
          </ModalBody>
          <ModalFooter className="mt-4">
            <Button 
              size="sm"
              variant="light" 
              onPress={onClose}
              className="px-4"
            >
              Cancel
            </Button>
            <Button 
              size="sm"
              color="primary" 
              type="submit"
              className="px-4"
            >
              {initialData ? 'Update' : 'Add'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
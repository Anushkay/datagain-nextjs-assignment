'use client'

import { useState, useMemo, useCallback } from 'react'
import dayjs from 'dayjs'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  Select,
  SelectItem
} from '@heroui/react'
import { addEvent } from '@/app/store/slices/calendarSlice'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'

// Weekday headings
const DAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function SchedulerPage() {
  const dispatch = useAppDispatch()
  const events = useAppSelector(s => s.calendar.events)

  const [currentMonth, setCurrentMonth] = useState(dayjs())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [type, setType] = useState<'event' | 'reminder'>('event')
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')

  // Calendar days generation
  const calendarDays = useMemo(() => {
    const start = currentMonth.startOf('month').startOf('week')
    const end = currentMonth.endOf('month').endOf('week')
    const days = []
    let day = start.clone()
    while (day.isBefore(end, 'day')) {
      days.push(day.clone())
      day = day.add(1, 'day')
    }
    return days
  }, [currentMonth])

  // Group events by date
  const eventsByDate = useMemo(() => {
    const grouped: Record<string, typeof events> = {}
    for (const event of events) {
      if (!grouped[event.date]) grouped[event.date] = []
      grouped[event.date].push(event)
    }
    return grouped
  }, [events])

  // Styling for cell based on type
  const getCellColor = useCallback((type: string) => {
    return type === 'event'
      ? 'bg-blue-500 text-white'
      : type === 'reminder'
        ? 'bg-orange-500 text-white'
        : 'bg-gray-300 text-black'
  }, [])

  const handleDateClick = useCallback((date: dayjs.Dayjs) => {
    setSelectedDate(date.format('YYYY-MM-DD'))
    setModalOpen(true)
  }, [])

  const goToPreviousMonth = useCallback(() => {
    setCurrentMonth(prev => prev.subtract(1, 'month'))
  }, [])
  const goToNextMonth = useCallback(() => {
    setCurrentMonth(prev => prev.add(1, 'month'))
  }, [])
  const goToToday = useCallback(() => {
    setCurrentMonth(dayjs())
  }, [])

  const handleCloseModal = useCallback(() => {
    setModalOpen(false)
    setTitle('')
    setTime('')
  }, [])

  const handleSave = useCallback(() => {
    if (selectedDate && title.trim()) {
      dispatch(addEvent({ date: selectedDate, title, type, time }))
      handleCloseModal()
    }
  }, [selectedDate, title, type, time, dispatch, handleCloseModal])

  // Render calendar cells
  const renderedCells = useMemo(() => {
    return calendarDays.map(date => {
      const dateStr = date.format('YYYY-MM-DD')
      const isCurrentMonth = date.month() === currentMonth.month()
      const dayEvents = eventsByDate[dateStr] || []
      return (
        <div
          key={dateStr}
          className={`
            border border-gray-200 min-h-[120px] p-2 cursor-pointer flex flex-col gap-1 
            hover:bg-gray-50 transition rounded-md
            ${!isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''}
          `}
          onClick={() => handleDateClick(date)}
        >
          <div className="text-sm font-medium">{date.date()}</div>
          <div className="flex flex-col gap-1 overflow-hidden">
            {dayEvents.slice(0, 3).map(ev => (
              <div
                key={ev.id}
                className={`px-1 text-xs rounded ${getCellColor(ev.type)} truncate`}
              >
                {ev.title}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="px-1 text-xs text-gray-500">
                +{dayEvents.length - 3} more
              </div>
            )}
          </div>
        </div>
      )
    })
  }, [calendarDays, currentMonth, eventsByDate, handleDateClick, getCellColor])

  return (
    <div className="h-screen overflow-hidden flex flex-col">

      {/* Main Header */}
      <div className="h-[80px] flex-shrink-0 bg-white border-b border-gray-200 p-4 shadow-sm z-20">
        <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
          {/* Navigation buttons */}
          <div className="flex gap-2">
            <Button size="sm" variant="light" onPress={goToPreviousMonth}>
              Previous
            </Button>
            <Button size="sm" variant="flat" onPress={goToToday}>
              Today
            </Button>
            <Button size="sm" variant="light" onPress={goToNextMonth}>
              Next
            </Button>
          </div>
          {/* Current date info */}
          <div className="text-center">
            <h2 className="text-xl font-bold">
                 {currentMonth.format('MMMM YYYY')}       
            </h2>
          </div>
          {/* View selector */}
          <div className="flex gap-2">
            <Select 
              size="sm" 
              className="w-32"
              selectedKeys={['month']}
              onChange={() => {}}
            >
              <SelectItem key="day">Day</SelectItem>
              <SelectItem key="week">Week</SelectItem>
              <SelectItem key="month">Month</SelectItem>
            </Select>
          </div>
        </div>
      </div>

      {/* Weekday Header */}
      <div className="h-[40px] flex-shrink-0 bg-white border-b border-gray-200 z-10">
        <div className="grid grid-cols-7 h-full">
          {DAY_HEADERS.map(d => (
            <div
              key={d}
              className="p-2 text-center font-semibold text-gray-600 text-sm"
            >
              {d}
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable Calendar Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-7 border border-gray-200 rounded-lg">
            {renderedCells}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <Modal isOpen onClose={handleCloseModal}>
          <ModalContent>
            <ModalHeader>Add to {selectedDate}</ModalHeader>
            <ModalBody>
              <Select
                label="Type"
                selectedKeys={[type]}
                onChange={e => setType(e.target.value as 'event' | 'reminder')}
              >
                <SelectItem key="event">Event</SelectItem>
                <SelectItem key="reminder">Reminder</SelectItem>
              </Select>
              <Input
                label="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <Input
                type="time"
                label="Time"
                value={time}
                onChange={e => setTime(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={handleCloseModal}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSave}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  )
}

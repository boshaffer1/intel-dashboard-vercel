'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { CalendarIcon, CheckIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function SchedulePage() {
  const todayEvents = [
    { time: '9:00 AM', event: 'Senior staff meeting', type: 'internal', status: 'completed' },
    { time: '10:30 AM', event: 'Housing coalition call', type: 'coalition', status: 'completed' },
    { time: '2:00 PM', event: 'Tribune editorial board', type: 'media', status: 'upcoming' },
    { time: '4:00 PM', event: 'Donor reception prep', type: 'fundraising', status: 'upcoming' },
    { time: '6:00 PM', event: 'Pilsen community forum', type: 'public', status: 'upcoming' }
  ];

  const weekAhead = [
    { day: 'Tomorrow', count: 7, highlight: 'CTU endorsement meeting' },
    { day: 'Wednesday', count: 5, highlight: 'Housing plan rollout' },
    { day: 'Thursday', count: 6, highlight: 'Debate prep session' },
    { day: 'Friday', count: 4, highlight: 'South Side canvass kickoff' },
    { day: 'Saturday', count: 8, highlight: 'Ward tours (3rd, 5th, 11th)' },
    { day: 'Sunday', count: 3, highlight: 'Church visits' }
  ];

  const tasks = [
    { task: 'Review and approve housing policy memo', assignee: 'Policy Team', due: 'Today 5 PM', priority: 'HIGH', status: 'in-progress' },
    { task: 'Prepare talking points for Tribune interview', assignee: 'Comms', due: 'Today 1 PM', priority: 'HIGH', status: 'completed' },
    { task: 'Coordinate with advance for Pilsen forum', assignee: 'Field', due: 'Today 3 PM', priority: 'MEDIUM', status: 'in-progress' },
    { task: 'Draft fundraising email for Q2 push', assignee: 'Finance', due: 'Tomorrow', priority: 'MEDIUM', status: 'pending' },
    { task: 'Opposition research on Giannoulias record', assignee: 'Research', due: 'Wed', priority: 'HIGH', status: 'pending' },
    { task: 'Book radio interviews for next week', assignee: 'Comms', due: 'Thu', priority: 'LOW', status: 'pending' }
  ];

  const getEventColor = (type: string) => {
    switch(type) {
      case 'internal': return 'bg-gray-100 text-gray-700';
      case 'coalition': return 'bg-purple-100 text-purple-700';
      case 'media': return 'bg-blue-100 text-blue-700';
      case 'fundraising': return 'bg-green-100 text-green-700';
      case 'public': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'HIGH': return 'text-red-600';
      case 'MEDIUM': return 'text-yellow-600';
      case 'LOW': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <DashboardLayout>
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Panel 6: Schedule + Tasks</h1>
        <p className="text-gray-600 mb-6">Campaign calendar and task management</p>
        
        <div className="grid grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700">Today's Schedule</h3>
              <CalendarIcon className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {todayEvents.map((event, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="text-xs text-gray-500 w-16 pt-1">{event.time}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {event.status === 'completed' && <CheckIcon className="w-3 h-3 text-green-500" />}
                      {event.status === 'upcoming' && <ClockIcon className="w-3 h-3 text-blue-500" />}
                      <span className={`text-sm ${event.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {event.event}
                      </span>
                    </div>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${getEventColor(event.type)}`}>
                      {event.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Week Ahead */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700">Week Ahead</h3>
              <UserGroupIcon className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {weekAhead.map((day) => (
                <div key={day.day} className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{day.day}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{day.highlight}</div>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-xs font-semibold text-gray-700 rounded">
                    {day.count} events
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Milestones */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Key Milestones</h3>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-3">
                <div className="text-sm font-medium text-gray-900">Housing Plan Launch</div>
                <div className="text-xs text-gray-500">May 28 • 2 days</div>
              </div>
              <div className="border-l-4 border-yellow-500 pl-3">
                <div className="text-sm font-medium text-gray-900">First TV Ad Buy</div>
                <div className="text-xs text-gray-500">June 15 • 20 days</div>
              </div>
              <div className="border-l-4 border-green-500 pl-3">
                <div className="text-sm font-medium text-gray-900">Q2 Fundraising Deadline</div>
                <div className="text-xs text-gray-500">June 30 • 35 days</div>
              </div>
              <div className="border-l-4 border-purple-500 pl-3">
                <div className="text-sm font-medium text-gray-900">First Debate</div>
                <div className="text-xs text-gray-500">July 12 • 47 days</div>
              </div>
              <div className="border-l-4 border-red-500 pl-3">
                <div className="text-sm font-medium text-gray-900">Filing Deadline</div>
                <div className="text-xs text-gray-500">Oct 25 • 152 days</div>
              </div>
            </div>
          </div>
        </div>

        {/* Task Tracker */}
        <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Active Tasks</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 font-medium text-gray-600">Task</th>
                  <th className="text-left py-2 font-medium text-gray-600">Assigned</th>
                  <th className="text-left py-2 font-medium text-gray-600">Due</th>
                  <th className="text-left py-2 font-medium text-gray-600">Priority</th>
                  <th className="text-left py-2 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="py-3 pr-4">{task.task}</td>
                    <td className="py-3">{task.assignee}</td>
                    <td className="py-3">{task.due}</td>
                    <td className="py-3">
                      <span className={`font-semibold ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        task.status === 'completed' ? 'bg-green-100 text-green-700' :
                        task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {task.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/views/HomeView';
import { HeritageExplorerView } from './components/views/HeritageExplorerView';
import { MathWoodshopView } from './components/views/MathWoodshopView';
import { LanguageCraftView } from './components/views/LanguageCraftView';
import { SocietyNatureView } from './components/views/SocietyNatureView';
import { GreenStemView } from './components/views/GreenStemView';
import { StudentProgressView } from './components/views/StudentProgressView';
import { TeacherPortalView } from './components/views/TeacherPortalView';
import { AboutProjectView } from './components/views/AboutProjectView';
import { 
  QuestionTask, 
  HeritageItem, 
  StudentSession, 
  ErrorCategory, 
  ApprovalStatus 
} from './types';
import { INITIAL_QUESTION_TASKS, INITIAL_HERITAGE_ITEMS } from './data/initialData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [largeText, setLargeText] = useState<boolean>(false);
  const [isTeacherAuthenticated, setIsTeacherAuthenticated] = useState<boolean>(false);

  // Persistent Question Tasks
  const [tasks, setTasks] = useState<QuestionTask[]>(() => {
    try {
      const saved = localStorage.getItem('phukhe_tasks_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load tasks from localStorage', e);
    }
    return INITIAL_QUESTION_TASKS;
  });

  // Persistent Heritage Items
  const [heritageItems, setHeritageItems] = useState<HeritageItem[]>(() => {
    try {
      const saved = localStorage.getItem('phukhe_heritage_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load heritage items from localStorage', e);
    }
    return INITIAL_HERITAGE_ITEMS;
  });

  // Student Session
  const [student, setStudent] = useState<StudentSession>(() => {
    try {
      const saved = localStorage.getItem('phukhe_student_session_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load student session', e);
    }
    return {
      studentCode: 'HS01',
      groupName: 'Lớp 2A',
      points: 20,
      completedTasks: ['toan-01', 'tv-01'],
      badges: ['Thợ Mộc Nhập Môn'],
      currentLevel: 'bat_dau',
      errorLog: []
    };
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('phukhe_tasks_v1', JSON.stringify(tasks));
    } catch (e) {
      console.warn(e);
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem('phukhe_heritage_v1', JSON.stringify(heritageItems));
    } catch (e) {
      console.warn(e);
    }
  }, [heritageItems]);

  useEffect(() => {
    try {
      localStorage.setItem('phukhe_student_session_v1', JSON.stringify(student));
    } catch (e) {
      console.warn(e);
    }
  }, [student]);

  // Record student answer & update gamification points
  const handleRecordAnswer = (
    taskId: string, 
    isCorrect: boolean, 
    errorCategory?: ErrorCategory, 
    usedHint?: boolean
  ) => {
    setStudent(prev => {
      let earnedPoints = 0;
      let newCompleted = [...prev.completedTasks];

      if (isCorrect) {
        if (!newCompleted.includes(taskId)) {
          newCompleted.push(taskId);
          earnedPoints = usedHint ? 5 : 10;
        }
      }

      const totalPoints = prev.points + earnedPoints;
      const newBadges = [...prev.badges];

      if (totalPoints >= 30 && !newBadges.includes('Bàn Tay Vàng Toán Mộc')) {
        newBadges.push('Bàn Tay Vàng Toán Mộc');
      }
      if (totalPoints >= 50 && !newBadges.includes('Hoa Văn Con Chữ')) {
        newBadges.push('Hoa Văn Con Chữ');
      }
      if (totalPoints >= 70 && !newBadges.includes('Nghệ Nhân Phù Khê Nhí')) {
        newBadges.push('Nghệ Nhân Phù Khê Nhí');
      }

      let newErrorLog = [...prev.errorLog];
      if (!isCorrect && errorCategory) {
        newErrorLog.push({
          taskId,
          errorCategory,
          chosenWrongAnswer: 'Lựa chọn chưa đúng',
          correctedAfterHint: false,
          timestamp: new Date().toISOString()
        });
      } else if (isCorrect && usedHint) {
        // Mark last error for this task as corrected after hint
        newErrorLog = newErrorLog.map(err => 
          err.taskId === taskId ? { ...err, correctedAfterHint: true } : err
        );
      }

      return {
        ...prev,
        points: totalPoints,
        completedTasks: newCompleted,
        badges: newBadges,
        errorLog: newErrorLog
      };
    });
  };

  const handleUpdateStudentCode = (code: string) => {
    setStudent(prev => ({
      ...prev,
      studentCode: code
    }));
  };

  const handleAddTask = (newTask: QuestionTask) => {
    setTasks(prev => [newTask, ...prev]);
  };

  const handleUpdateTaskStatus = (taskId: string, status: ApprovalStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const handleAddHeritageItem = (newItem: HeritageItem) => {
    setHeritageItems(prev => [newItem, ...prev]);
  };

  const handleDeleteHeritageItem = (id: string) => {
    setHeritageItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className={`min-h-screen bg-[#FFF8EC] text-slate-800 flex flex-col ${largeText ? 'text-lg' : ''}`}>
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        student={student}
        onUpdateStudentCode={handleUpdateStudentCode}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        largeText={largeText}
        onToggleLargeText={() => setLargeText(!largeText)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6">
        {currentTab === 'home' && (
          <HomeView
            onNavigate={setCurrentTab}
            soundEnabled={soundEnabled}
            largeText={largeText}
          />
        )}

        {currentTab === 'kham_pha' && (
          <HeritageExplorerView
            items={heritageItems}
            onAddItem={handleAddHeritageItem}
            onDeleteItem={handleDeleteHeritageItem}
            soundEnabled={soundEnabled}
            largeText={largeText}
            isTeacherMode={isTeacherAuthenticated}
          />
        )}

        {currentTab === 'toan' && (
          <MathWoodshopView
            tasks={tasks}
            student={student}
            onRecordAnswer={handleRecordAnswer}
            soundEnabled={soundEnabled}
            largeText={largeText}
          />
        )}

        {currentTab === 'tieng_viet' && (
          <LanguageCraftView
            tasks={tasks}
            student={student}
            onRecordAnswer={handleRecordAnswer}
            soundEnabled={soundEnabled}
            largeText={largeText}
          />
        )}

        {currentTab === 'tn_xh' && (
          <SocietyNatureView
            tasks={tasks}
            student={student}
            onRecordAnswer={handleRecordAnswer}
            soundEnabled={soundEnabled}
            largeText={largeText}
          />
        )}

        {currentTab === 'stem' && (
          <GreenStemView
            soundEnabled={soundEnabled}
            largeText={largeText}
          />
        )}

        {currentTab === 'tien_do' && (
          <StudentProgressView
            student={student}
            allTasks={tasks}
            onNavigate={setCurrentTab}
            soundEnabled={soundEnabled}
            largeText={largeText}
          />
        )}

        {currentTab === 'giao_vien' && (
          <TeacherPortalView
            tasks={tasks}
            onAddTask={handleAddTask}
            onUpdateTaskStatus={handleUpdateTaskStatus}
            onDeleteTask={handleDeleteTask}
            isTeacherAuthenticated={isTeacherAuthenticated}
            onAuthenticateTeacher={setIsTeacherAuthenticated}
          />
        )}

        {currentTab === 'gioi_thieu' && (
          <AboutProjectView />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-white border-t-2 border-amber-200/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-bold text-[#75462A]">
            PHÙ KHÊ THÔNG MINH AI 2026 • Từ làng nghề quê em đến lớp học thông minh
          </p>
          <p>
            Tác giả: <strong>Dương Thị Huệ</strong> — Trường Tiểu học Phù Khê 2, Bắc Ninh
          </p>
          <p className="text-[11px] text-slate-400">
            Ứng dụng đạt chuẩn bảo mật thông tin trẻ em & tuân thủ Chương trình GDPT 2018 Lớp 2.
          </p>
        </div>
      </footer>
    </div>
  );
}

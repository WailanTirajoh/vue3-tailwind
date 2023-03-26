<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

type Days = {
  date: number;
  name: string;
  month: string;
  year: number;
  fulldate: string;
  jsDate: Date;
};
type Week = {
  days: Array<Days>;
};
interface Calendar {
  month: string;
  weeks: Array<Week>;
  year: number;
}

const calendar = ref<Calendar>();
const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());

// create an array to store the names of the months
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// create an array to store the day names
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const findDate = computed(() => (week: Week, dateName: string) => {
  return week.days.filter((d) => d.name === dateName)[0];
});

function generateCalendarRef() {
  // create a new date object for the first day of the current month
  const firstDay = new Date(currentYear.value, currentMonth.value, 1);

  // create an object to store the calendar data
  const generateCalendar: Calendar = {
    month: monthNames[currentMonth.value],
    year: currentYear.value,
    weeks: [],
  };

  // fill the calendar data
  const daysInMonth = new Date(
    currentYear.value,
    currentMonth.value + 1,
    0
  ).getDate();
  const day = firstDay.getDay();
  let date = 1;
  let prevMonth = currentMonth.value - 1;
  let prevYear = currentYear.value;
  if (prevMonth < 0) {
    prevMonth = 11;
    prevYear--;
  }
  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
  for (let i = 0; i < 6; i++) {
    const week: {
      days: Array<Days>;
    } = {
      days: [],
    };
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < day) {
        week.days.push({
          name: dayNames[j],
          date: daysInPrevMonth - (day - j - 1),
          month: monthNames[prevMonth],
          year: prevYear,
          fulldate: `${prevYear}-${(prevMonth + 1)
            .toString()
            .padStart(2, "0")}-${(daysInPrevMonth - (day - j - 1))
            .toString()
            .padStart(2, "0")}`,
          jsDate: new Date(
            Date.UTC(
              currentYear.value,
              prevMonth,
              daysInPrevMonth - (day - j - 1)
            )
          ),
        });
      } else {
        if (date <= daysInMonth) {
          week.days.push({
            name: dayNames[j],
            date: date,
            month: monthNames[currentMonth.value],
            year: currentYear.value,
            fulldate: `${currentYear.value}-${(currentMonth.value + 1)
              .toString()
              .padStart(2, "0")}-${date.toString().padStart(2, "0")}`,
            jsDate: new Date(
              Date.UTC(currentYear.value, currentMonth.value, date)
            ),
          });
          date++;
        } else {
          let nextMonth = currentMonth.value + 1;
          let nextYear = currentYear.value;
          if (nextMonth > 11) {
            nextMonth = 0;
            nextYear++;
          }
          week.days.push({
            name: dayNames[j],
            date: date - daysInMonth,
            month: monthNames[nextMonth],
            year: nextYear,
            fulldate: `${nextYear}-${(nextMonth + 1)
              .toString()
              .padStart(2, "0")}-${(date - daysInMonth)
              .toString()
              .padStart(2, "0")}`,
            jsDate: new Date(Date.UTC(nextYear, nextMonth, date - daysInMonth)),
          });
          date++;
        }
      }
    }
    generateCalendar.weeks.push(week);
  }

  calendar.value = generateCalendar;
}

function fprevMont() {
  if (currentMonth.value - 1 === 0) {
    currentYear.value = currentYear.value - 1;
    currentMonth.value = 11;
  } else {
    currentMonth.value--;
  }
  generateCalendarRef();
}

function fnextMonth() {
  if (currentMonth.value + 1 > 11) {
    currentYear.value = currentYear.value + 1;
    currentMonth.value = 0;
  } else {
    currentMonth.value++;
  }
  generateCalendarRef();
}

onMounted(() => {
  generateCalendarRef();
});
</script>

<template>
  <div class="w-full bg-white p-4 rounded shadow grid gap-4" v-if="calendar">
    <div class="flex justify-between">
      <div class="text-2xl font-bold">
        {{ calendar.month }}
        {{ calendar.year }}
      </div>
      <div class="flex gap-2 justify-end items-center">
        <button
          class="w-10 h-10 hover:bg-gray-200 flex items-center justify-center rounded duration-300 ease-in-out"
          @click="fprevMont"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
        <button
          class="w-10 h-10 hover:bg-gray-200 flex items-center justify-center rounded duration-300 ease-in-out"
          @click="fnextMonth"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
    </div>
    <table class="w-full">
      <thead>
        <tr>
          <th class="p-4 border" v-for="day in dayNames" :key="day">
            {{ day }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, index) in calendar.weeks" :key="`week-${index}`">
          <td
            class="p-4 hover:bg-gray-50 border"
            :class="{
              'text-gray-400 hover:bg-white':
                (index === 0 && findDate(week, day).date > 15) ||
                (index > 3 && findDate(week, day).date < 15),
            }"
            v-for="day in dayNames"
            :key="day"
          >
            {{ findDate(week, day).date }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

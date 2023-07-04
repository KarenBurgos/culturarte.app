import React, { useState, useEffect } from "react";
import axios from "axios";

import { AiOutlineMenu } from "react-icons/ai";

import Menu from "../components/menu/Menu";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";
import { Link } from "react-router-dom";
import upcomingEvent from "../assets/upcomingEvent.png";
import CategoryBanner from "../components/CategoryBanner";

import ResponsiveNav from "../components/menu/responsive/ResponsiveNav";
import ResponsiveMenuNoFilters from "../components/menu/responsive/ResponsiveMenuNoFilters";

import { getAllUpcomingEvents } from "../services/Event";

function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const openMenu = () => {
    setMenuVisible(true);
  };

  const monthNames = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  useEffect(() => {
    getAllUpcomingEvents()
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  return (
    <div class="h-screen w-screen font-montserrat">
      <ResponsiveNav openMenu={openMenu} />
      <Menu />
      <div className="w-full h-auto">
        <CategoryBanner
          bgColor="#B686E5"
          category="Eventos proximos"
          class="w-screen"
        />
      </div>
      <div class="flex">
        {menuVisible && <ResponsiveMenuNoFilters closeMenu={closeMenu} />}
        <section class="flex flex-wrap py-8 gap-10 justify-start bg-gray-300 w-screen px-8">
          {events.map((event) => (
            <div
              class="cursor-pointer hover:scale-105 transition-transform"
              key={`${event.eventId}_event_card`}
            >
              <EventCard
                id={event.eventId}
                participants={event.involved}
                description={event.description}
                image={event.image.id}
                association={event.association}
                date={`${event.date[2]} ${monthNames[event.date[1]]}`}
                title={event.title}
                time={`${event.hour[0]}:${event.hour[1]}`}
                bgColor={event.category.color}
                category={event.category.name}
                location={event.place}
              />
            </div>
          ))}
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default UpcomingEvents;

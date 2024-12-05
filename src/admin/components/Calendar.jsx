import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function Calendar({ label }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [batchIndex, setBatchIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [visibleDays, setVisibleDays] = useState(7);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (isMobile) {
      setVisibleDays(2);
    } else {
      setVisibleDays(7);
    }
  }, [isMobile]);

  const handlePrevDay = () => {
    setCurrentDate((prev) => new Date(prev.setDate(prev.getDate() - 1)));
  };

  const handleNextDay = () => {
    setCurrentDate((prev) => new Date(prev.setDate(prev.getDate() + 1)));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSelectDate = (date) => {
    setCurrentDate(new Date(date));
    handleCloseMenu();
  };

  const getBookingDates = () => {
    const uniqueDates = [...new Set(bookings.map((booking) => booking.date))];
    return uniqueDates.sort((a, b) => new Date(a) - new Date(b));
  };

  const handlePrevBatch = () => {
    setBatchIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNextBatch = () => {
    if ((batchIndex + 1) * visibleDays < tables.length) {
      setBatchIndex((prev) => prev + 1);
    }
  };

  const generateTimeSlots = () => {
    return Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);
  };

  const tables = [
    "Table 01",
    "Table 02",
    "Table 03",
    "Table 04",
    "Table 05",
    "Table 06",
    "Table 07",
    "Table 08",
    "Table 09",
    "Table 10",
    "Table 11",
    "Table 12",
  ];

  const bookings = [
    { date: "2024-12-01", time: "00:00 - 01:00", table: "Table 01", company: "Company A" },
    { date: "2024-12-01", time: "01:00 - 02:00", table: "Table 02", company: "Company B" },
    { date: "2024-12-01", time: "15:00 - 16:00", table: "Table 06", company: "Company C" },
    { date: "2024-12-05", time: "00:00 - 01:00", table: "Table 06", company: "Company L" },
    { date: "2024-12-05", time: "00:00 - 01:00", table: "Table 05", company: "Company M" },
    { date: "2024-12-05", time: "00:00 - 01:00", table: "Table 06", company: "Company N" },
    { date: "2024-12-06", time: "13:00 - 14:00", table: "Table 03", company: "Company O" },
    { date: "2024-12-06", time: "14:00 - 15:00", table: "Table 04", company: "Company P" },
    { date: "2024-12-07", time: "16:00 - 17:00", table: "Table 06", company: "Company R" },
  ];

  const selectedDate = currentDate.toISOString().split("T")[0];
  const startIndex = batchIndex * visibleDays;
  const currentTables = tables.slice(startIndex, startIndex + visibleDays);

  return (
    <Box p={isMobile ? 2 : 4} position="relative">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={isMobile ? 2 : 3}
        flexDirection={isMobile ? "column" : "row"}
      >
        <Box textAlign={isMobile ? "center" : "left"} mb={isMobile ? 2 : 0}>
          <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold">
            Dashboard Meja
          </Typography>
          <Typography variant="body2" color="textSecondary" mt={1}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" flexDirection={isMobile ? "column" : "row"}>
          <Button
            variant="contained"
            onClick={handleToday}
            sx={{
              mr: isMobile ? 0 : 2,
              mb: isMobile ? 1 : 0,
              backgroundColor: "#ED2137",
              width: isMobile ? "100%" : "auto",
            }}
          >
            Today
          </Button>

          <Box display="flex" alignItems="center">
            <IconButton onClick={handlePrevDay}>
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton onClick={handleNextDay}>
              <ArrowForwardIosIcon />
            </IconButton>

            <Button
              endIcon={<ArrowDropDownIcon />}
              onClick={handleOpenMenu}
              sx={{
                textTransform: "none",
                fontSize: isMobile ? "14px" : "16px",
                color: "black",
                fontWeight: "bold",
              }}
            >
              {currentDate.toDateString()}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              MenuListProps={{
                sx: {
                  maxHeight: 300,
                  overflow: "auto",
                },
              }}
            >
              {getBookingDates().map((date) => (
                <MenuItem key={date} onClick={() => handleSelectDate(date)}>
                  {new Date(date).toDateString()}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
      </Box>

      <Grid container alignItems="stretch">
        <Grid item xs={isMobile ? 2 : 1}>
          <Box sx={{ borderRight: "1px solid #e0e0e0" }}>
            <Box
              sx={{
                height: 60,
                borderBottom: "1px solid #e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography fontWeight="bold">GMT +7</Typography>
            </Box>
            {generateTimeSlots().map((time) => (
              <Box
                key={time}
                sx={{
                  height: 60,
                  borderBottom: "1px solid #e0e0e0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography>{time}</Typography>
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid
          item
          xs={isMobile ? 10 : 11}
          sx={{
            overflowX: isMobile ? "auto" : "hidden",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              width: "100%",
              borderLeft: "1px solid #e0e0e0",
              height: "100%",
            }}
          >
            {currentTables.map((table) => (
              <Box
                key={table}
                sx={{
                  flex: `1 0 ${100 / visibleDays}%`,
                  borderRight: "1px solid #e0e0e0",
                }}
              >
                <Box
                  sx={{
                    height: 60,
                    borderBottom: "1px solid #e0e0e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography fontWeight="bold">{table}</Typography>
                </Box>
                {generateTimeSlots().map((time, index) => {
                  const bookingsForTimeSlot = bookings.filter(
                    (booking) =>
                      booking.table === table &&
                      booking.date === selectedDate &&
                      booking.time.startsWith(time)
                  );

                  return (
                    <Box
                      key={index}
                      sx={{
                        height: 60,
                        borderBottom: "1px solid #e0e0e0",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {bookingsForTimeSlot.length > 0 && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: "5%",
                            right: "5%",
                            backgroundColor: "#f5f5f5",
                            borderRadius: "4px",
                            padding: "4px",
                            textAlign: "left",
                          }}
                        >
                          <Typography variant="body2" sx={{ fontWeight: "normal" }}>
                            {time} - {`${parseInt(time.split(":")[0]) + 1}:00`}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                            {bookingsForTimeSlot.map((b) => b.company).join(", ")}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  );
                })}
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>

      <IconButton
        onClick={handlePrevBatch}
        disabled={batchIndex === 0}
        sx={{
          position: "absolute",
          top: isMobile ? 170 : 150,
          left: 0,
          zIndex: 1000,
          backgroundColor: "#ED2137",
          borderRadius: "10px", 
          color: "white",
          width: "40px", 
          height: "40px",
          border: "1px solid",
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton
        onClick={handleNextBatch}
        disabled={(batchIndex + 1) * visibleDays >= tables.length}
        sx={{
          position: "absolute",
          top: isMobile ? 170 : 150,
          right: 0,
          borderRadius: "10px", 
          width: "40px", 
          height: "40px", 
          zIndex: 1000,
          color: "white",
          backgroundColor: "#ED2137",
          border: "1px solid",
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
}

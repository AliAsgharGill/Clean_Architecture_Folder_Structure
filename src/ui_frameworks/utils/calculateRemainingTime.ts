export const calculateRemainingTime = (endDate: string) => {
    const endDateTime = new Date(endDate).getTime();
    const currentDateTime = new Date().getTime();
    const diff = endDateTime - currentDateTime;
  
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
    let remainingTime = "";
    if (days > 0) {
      remainingTime += days + " days ";
    }
    if (hours > 0) {
      remainingTime += hours + " hours ";
    }
    if (minutes > 0) {
      remainingTime += minutes + " minutes ";
    }
    if (seconds > 0) {
      remainingTime += seconds + " seconds ";
    }
  
    return remainingTime.trim();
  };
  
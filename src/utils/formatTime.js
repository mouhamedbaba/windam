export  const formatTime = (timestamp) => {
    if (timestamp && timestamp.toDate) {
      const date = new Date(timestamp.toDate());
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedTime = `${hours % 12}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
      return formattedTime;
    } else {
      return 'just now'; // Ou renvoyez une valeur par défaut si timestamp est null ou undefined
    }
  };
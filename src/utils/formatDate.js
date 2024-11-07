


export const FormateDateToPastAsTextValue = (dateString) => {
    const now = new Date()
    const pastDate = new Date(dateString)
    const diffInSeconds = Math.floor( (now - pastDate) / 1000)

    const timeIntervals = {
        year : 31536000,
        month : 2592000,
        week : 604800,
        day : 86400,
        hour : 3600,
        minute : 60,
        second : 1
    }

    for(let interval in timeIntervals){
        const timeDiff = Math.floor( diffInSeconds / timeIntervals[interval])

        if(timeDiff >= 1){
          return timeDiff === 1 ? `${timeDiff} ${interval} ago` : `${timeDiff} ${interval}s ago`
        }
    }

        return 'just now'
}
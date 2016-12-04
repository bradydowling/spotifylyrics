tell application "Spotify"
    set myTrack to name of current track
    set myArtist to artist of current track
    set myAlbum to album of current track
    set info to "{"
    set info to info & "\n  \"artist\": \"" & myArtist & "\","
    set info to info & "\n  \"title\": \"" & myTrack & "\","
    set info to info & "\n  \"album\": \"" & myAlbum & "\","
    set info to info & "\n  \"uri\": \"" & spotify url of current track & "\""
    set info to info & "\n}"
end tell
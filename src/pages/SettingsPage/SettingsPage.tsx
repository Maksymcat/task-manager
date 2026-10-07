import { useEffect, useState } from "react"
import { useSettings } from "../../context/SettingsContext";

type Theme = "dark" | "light"

function SettingsPage() {

    const {
  theme,
  setTheme,
} = useSettings();

    return (
        <>

            <h1>Settings</h1>
            <select
  value={theme}
  onChange={(e) => 
    setTheme(e.target.value as Theme)
  }
>
  <option value="dark">Dark</option>
  <option value="light">Light</option>
</select>

        </>
    )
}

export default SettingsPage
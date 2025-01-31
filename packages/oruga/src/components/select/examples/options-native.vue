<template>
    <section>
        <o-field label="Where would you prefer to live?">
            <o-select placeholder="Select a planet" expanded>
                <optgroup label="Inner Planets">
                    <option value="mercury">Mercury</option>
                    <option value="venus">Venus</option>
                    <option value="earth">Earth</option>
                    <option value="mars">Mars</option>
                </optgroup>
                <optgroup label="Outer planets">
                    <option value="jupiter">Jupiter</option>
                    <option value="saturn">Saturn</option>
                    <option value="uranus">Uranus</option>
                    <option value="neptune">Neptune</option>
                </optgroup>
            </o-select>
        </o-field>
    </section>
</template>
